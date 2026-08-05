-- ═══════════════════════════════════════════════════════════════════════
-- CLMS — PostgreSQL Schema
-- Run this against a fresh `clmsdb` database.
-- Spring Boot will handle DDL updates via hibernate.ddl-auto=update
-- ═══════════════════════════════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- for full-text trigram search

-- ─── Roles ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(50) UNIQUE NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Permissions ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS permissions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Role ↔ Permission ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id         UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id   UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- ─── Users ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    email               VARCHAR(255) UNIQUE NOT NULL,
    password            VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    avatar              TEXT,
    bio                 TEXT,
    is_email_verified   BOOLEAN DEFAULT FALSE,
    is_active           BOOLEAN DEFAULT TRUE,
    email_verify_token  VARCHAR(255),
    reset_token         VARCHAR(255),
    reset_token_expiry  TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ,
    created_by          VARCHAR(255),
    updated_by          VARCHAR(255)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active) WHERE deleted_at IS NULL;

-- ─── User ↔ Role ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ─── Refresh Tokens ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token       VARCHAR(512) UNIQUE NOT NULL,
    expires_at  TIMESTAMPTZ NOT NULL,
    is_revoked  BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_token_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_token_user ON refresh_tokens(user_id);

-- ─── Categories ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name                VARCHAR(100) NOT NULL,
    description         TEXT,
    icon                VARCHAR(100),
    parent_category_id  UUID REFERENCES categories(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);

-- ─── Instructors ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS instructors (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expertise       TEXT,
    rating          DECIMAL(3,2) DEFAULT 0.0,
    total_students  INT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

-- ─── Courses ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    short_description   VARCHAR(500),
    thumbnail           TEXT,
    price               DECIMAL(10,2) DEFAULT 0.00,
    discount_price      DECIMAL(10,2),
    level               VARCHAR(20) CHECK (level IN ('BEGINNER','INTERMEDIATE','ADVANCED')) DEFAULT 'BEGINNER',
    status              VARCHAR(20) CHECK (status IN ('DRAFT','PUBLISHED','ARCHIVED')) DEFAULT 'DRAFT',
    language            VARCHAR(50) DEFAULT 'English',
    total_duration      INT DEFAULT 0,
    total_lessons       INT DEFAULT 0,
    rating              DECIMAL(3,2) DEFAULT 0.0,
    total_ratings       INT DEFAULT 0,
    is_featured         BOOLEAN DEFAULT FALSE,
    instructor_id       UUID NOT NULL REFERENCES instructors(id),
    category_id         UUID REFERENCES categories(id),
    requirements        JSONB DEFAULT '[]',
    objectives          JSONB DEFAULT '[]',
    tags                JSONB DEFAULT '[]',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ,
    created_by          VARCHAR(255),
    updated_by          VARCHAR(255)
);

CREATE INDEX idx_courses_status ON courses(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_featured ON courses(is_featured) WHERE status = 'PUBLISHED';
CREATE INDEX idx_courses_title_trgm ON courses USING GIN (title gin_trgm_ops);

-- ─── Lessons ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           VARCHAR(255) NOT NULL,
    content         TEXT,
    order_index     INT NOT NULL DEFAULT 0,
    duration        INT DEFAULT 0,
    lesson_type     VARCHAR(20) CHECK (lesson_type IN ('VIDEO','PDF','TEXT','QUIZ')) DEFAULT 'TEXT',
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    video_url       TEXT,
    pdf_url         TEXT,
    is_preview      BOOLEAN DEFAULT FALSE,
    resources       JSONB DEFAULT '[]',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_lessons_course ON lessons(course_id, order_index);

-- ─── Videos ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS videos (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id       UUID UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
    url             TEXT NOT NULL,
    duration        INT,
    resolution      VARCHAR(20),
    file_size       BIGINT,
    thumbnail_url   TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Enrollments ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    status          VARCHAR(20) CHECK (status IN ('ACTIVE','COMPLETED','CANCELLED')) DEFAULT 'ACTIVE',
    progress        INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- ─── Progress ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS progress (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id           UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed        BOOLEAN DEFAULT FALSE,
    completed_at        TIMESTAMPTZ,
    watched_duration    INT DEFAULT 0,
    last_watched_at     TIMESTAMPTZ DEFAULT NOW(),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, lesson_id)
);

CREATE INDEX idx_progress_student ON progress(student_id);

-- ─── Quizzes ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    course_id       UUID REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id       UUID REFERENCES lessons(id) ON DELETE SET NULL,
    time_limit      INT DEFAULT 30,
    passing_score   INT DEFAULT 70,
    max_attempts    INT DEFAULT 3,
    is_published    BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,
    created_by      VARCHAR(255)
);

-- ─── Questions ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id         UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text   TEXT NOT NULL,
    question_type   VARCHAR(20) CHECK (question_type IN ('MCQ','FILL_BLANK','CODING')) DEFAULT 'MCQ',
    order_index     INT DEFAULT 0,
    points          INT DEFAULT 1,
    explanation     TEXT,
    correct_answer  TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Quiz Options ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_options (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id     UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text     TEXT NOT NULL,
    is_correct      BOOLEAN DEFAULT FALSE,
    order_index     INT DEFAULT 0
);

-- ─── Quiz Attempts ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id         UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    score           DECIMAL(5,2) DEFAULT 0,
    is_passed       BOOLEAN DEFAULT FALSE,
    answers         JSONB DEFAULT '{}',
    time_taken      INT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);

-- ─── Certificates ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    issued_at           TIMESTAMPTZ DEFAULT NOW(),
    certificate_url     TEXT,
    verification_code   VARCHAR(100) UNIQUE NOT NULL,
    is_valid            BOOLEAN DEFAULT TRUE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

CREATE INDEX idx_cert_verification ON certificates(verification_code);

-- ─── Payments ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id                  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id                   UUID NOT NULL REFERENCES courses(id),
    amount                      DECIMAL(10,2) NOT NULL,
    currency                    VARCHAR(10) DEFAULT 'USD',
    status                      VARCHAR(20) CHECK (status IN ('PENDING','SUCCESS','FAILED','REFUNDED')) DEFAULT 'PENDING',
    stripe_payment_intent_id    VARCHAR(255),
    stripe_session_id           VARCHAR(255),
    paid_at                     TIMESTAMPTZ,
    refunded_at                 TIMESTAMPTZ,
    created_at                  TIMESTAMPTZ DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Notifications ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    message     TEXT,
    type        VARCHAR(20) CHECK (type IN ('INFO','SUCCESS','WARNING','ERROR')) DEFAULT 'INFO',
    is_read     BOOLEAN DEFAULT FALSE,
    read_at     TIMESTAMPTZ,
    action_url  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- ─── Discussions ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discussions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id   UUID REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id   UUID REFERENCES lessons(id) ON DELETE SET NULL,
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    content     TEXT NOT NULL,
    is_pinned   BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);

-- ─── Comments ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id       UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
    author_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content             TEXT NOT NULL,
    parent_comment_id   UUID REFERENCES comments(id) ON DELETE CASCADE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);

-- ─── Assignments ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assignments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    due_date    TIMESTAMPTZ,
    max_score   INT DEFAULT 100,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Submissions ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id   UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    submitted_at    TIMESTAMPTZ DEFAULT NOW(),
    content         TEXT,
    file_url        TEXT,
    score           INT,
    feedback        TEXT,
    status          VARCHAR(20) CHECK (status IN ('SUBMITTED','GRADED','RETURNED')) DEFAULT 'SUBMITTED',
    UNIQUE (assignment_id, student_id)
);

-- ─── Bookmarks ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookmarks (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id   UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    note        TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, lesson_id)
);

-- ─── Wishlist ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    added_at    TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

-- ─── Chat History ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_history (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id  VARCHAR(100) NOT NULL,
    message     TEXT NOT NULL,
    response    TEXT NOT NULL,
    model       VARCHAR(100),
    tokens_used INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_history_user_session ON chat_history(user_id, session_id);

-- ─── AI Logs ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_logs (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
    endpoint            VARCHAR(100),
    prompt_tokens       INT DEFAULT 0,
    completion_tokens   INT DEFAULT 0,
    total_tokens        INT DEFAULT 0,
    model               VARCHAR(100),
    latency_ms          BIGINT,
    is_success          BOOLEAN DEFAULT TRUE,
    error_message       TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_logs_user ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_created ON ai_logs(created_at DESC);

-- ─── Study Plans ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_plans (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID REFERENCES courses(id) ON DELETE SET NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    start_date      DATE,
    end_date        DATE,
    schedule        JSONB DEFAULT '{}',
    ai_generated    BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Learning Reports ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS learning_reports (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_type     VARCHAR(50),
    report_data     JSONB DEFAULT '{}',
    ai_narrative    TEXT,
    generated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Audit Logs ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    action      VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id   UUID,
    old_value   TEXT,
    new_value   TEXT,
    ip_address  VARCHAR(45),
    user_agent  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ─── Seed Default Data ────────────────────────────────────────────────
INSERT INTO roles (id, name) VALUES
    ('00000000-0000-0000-0000-000000000001', 'ADMIN'),
    ('00000000-0000-0000-0000-000000000002', 'INSTRUCTOR'),
    ('00000000-0000-0000-0000-000000000003', 'STUDENT')
ON CONFLICT (name) DO NOTHING;

INSERT INTO categories (id, name, description, icon) VALUES
    (uuid_generate_v4(), 'Programming', 'Learn coding and software development', 'code'),
    (uuid_generate_v4(), 'Data Science', 'Machine learning, AI, and analytics', 'chart-bar'),
    (uuid_generate_v4(), 'Design', 'UI/UX and graphic design', 'palette'),
    (uuid_generate_v4(), 'Business', 'Entrepreneurship and management', 'briefcase'),
    (uuid_generate_v4(), 'Mathematics', 'Algebra, calculus, statistics', 'calculator'),
    (uuid_generate_v4(), 'Language', 'English, Spanish, French and more', 'language')
ON CONFLICT DO NOTHING;
