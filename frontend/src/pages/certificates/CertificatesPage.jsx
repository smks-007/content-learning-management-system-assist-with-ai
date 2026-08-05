import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDownload, FiShare2, FiExternalLink, FiShield } from 'react-icons/fi';
import { studentService } from '../../services/studentService';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export default function CertificatesPage() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    studentService.getCertificates().then(res => {
      setCerts(res.data?.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const copyVerifyLink = (code) => {
    navigator.clipboard.writeText(`${window.location.origin}/verify/${code}`);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><FiAward className="text-amber-400" /> My Certificates</h1>
        <p className="text-gray-400 text-sm mt-1">Your achievements and completed course certificates</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-16"><div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto" /></div>
      ) : certs.length === 0 ? (
        <EmptyState icon={FiAward} title="No certificates yet"
          description="Complete a course and pass the final quiz to earn your first certificate!" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div key={cert.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="relative bg-gradient-to-br from-amber-950/30 via-dark-900 to-dark-900 border border-amber-500/30 rounded-2xl p-6 overflow-hidden group hover:border-amber-400/50 transition-all">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-amber-400/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-amber-400/70 uppercase tracking-widest mb-1">Certificate of Completion</div>
                <h3 className="font-bold text-white text-lg leading-tight mb-1 line-clamp-2">{cert.courseName}</h3>
                <p className="text-gray-400 text-xs mb-4">Issued to <span className="text-white">{cert.studentName}</span> on {formatDate(cert.issuedAt)}</p>

                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <FiShield className="w-3 h-3 text-emerald-400" />
                  <span className="font-mono text-emerald-400/70">{cert.verificationCode?.slice(0, 16)}...</span>
                </div>

                <div className="flex gap-2">
                  <a href={`/api/certificates/${cert.id}/download`} target="_blank" rel="noreferrer"
                    className="flex-1 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                    <FiDownload className="w-3 h-3" /> Download
                  </a>
                  <button onClick={() => copyVerifyLink(cert.verificationCode)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                    <FiShare2 className="w-3 h-3" /> Share
                  </button>
                  <a href={`/verify/${cert.verificationCode}`} target="_blank" rel="noreferrer"
                    className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs flex items-center justify-center transition-colors">
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
