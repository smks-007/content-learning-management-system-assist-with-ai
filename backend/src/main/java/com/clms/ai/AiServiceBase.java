package com.clms.ai;

import com.clms.entity.AiLog;
import com.clms.repository.AiLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Slf4j
public abstract class AiServiceBase {
    
    @Autowired
    protected ChatModel chatModel;
    
    @Autowired
    protected AiLogRepository aiLogRepository;
    
    protected String callAi(String systemPrompt, String userPrompt, UUID userId, String endpoint) {
        long start = System.currentTimeMillis();
        boolean success = true;
        String error = null;
        String response = "";
        try {
            java.util.List<org.springframework.ai.chat.messages.Message> messages = java.util.List.of(new SystemMessage(systemPrompt), new UserMessage(userPrompt));
            var chatResponse = chatModel.call(new Prompt(messages));
            response = chatResponse.getResult().getOutput().getText();
        } catch (Exception e) {
            success = false;
            error = e.getMessage();
            log.error("AI call failed for endpoint {}: {}", endpoint, e.getMessage());
            response = generateSmartFallback(userPrompt);
        } finally {
            long latency = System.currentTimeMillis() - start;
            AiLog aiLog = AiLog.builder()
                .endpoint(endpoint)
                .model("ollama-fallback")
                .latencyMs(latency)
                .isSuccess(success)
                .errorMessage(error)
                .build();
            aiLogRepository.save(aiLog);
        }
        return response;
    }

    protected String generateSmartFallback(String prompt) {
        String lower = prompt != null ? prompt.toLowerCase() : "";
        if (lower.contains("react") || lower.contains("component") || lower.contains("hook")) {
            return "### 💡 React Learning Assistant\n\nReact is a component-based JavaScript library for building user interfaces.\n\n**Key Concepts:**\n- **Components**: Reusable UI building blocks.\n- **State (`useState`)**: Stores component state.\n- **Effects (`useEffect`)**: Manages side effects such as API calls.\n\n```jsx\nimport React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n```";
        } else if (lower.contains("java") || lower.contains("spring") || lower.contains("boot")) {
            return "### ☕ Java & Spring Boot Guide\n\nSpring Boot makes it easy to create stand-alone, production-grade Spring based Applications.\n\n```java\n@RestController\n@RequestMapping(\"/api\")\npublic class HelloController {\n    @GetMapping(\"/hello\")\n    public String sayHello() {\n        return \"Hello from Spring Boot!\";\n    }\n}\n```";
        } else if (lower.contains("python") || lower.contains("data") || lower.contains("pandas")) {
            return "### 🐍 Python Data Analysis\n\nPython provides rich ecosystem libraries like `pandas` and `numpy` for data manipulation:\n\n```python\nimport pandas as pd\n\ndata = {'Student': ['Alice', 'Bob'], 'Score': [95, 88]}\ndf = pd.DataFrame(data)\nprint(df.describe())\n```";
        } else if (lower.contains("quiz") || lower.contains("question") || lower.contains("test")) {
            return "### 📝 AI Practice Question\n\n**Question:** What is the primary function of Spring Security in a Spring Boot application?\n\n- **A)** Database migrations\n- **B)** Authentication and Access Control\n- **C)** Frontend template rendering\n\n*Correct Answer:* **B** - Spring Security handles authentication, authorization, and protection against vulnerabilities.";
        } else {
            return "### 🤖 CLMS AI Assistant\n\nHello! I am your AI learning companion.\n\n- Ask me to explain topics in **React**, **Java**, **Python**, or **Database Systems**.\n- Ask for **code explanations**, **quiz questions**, or **study recommendations**!\n\nWhat would you like to learn about next?";
        }
    }
}
