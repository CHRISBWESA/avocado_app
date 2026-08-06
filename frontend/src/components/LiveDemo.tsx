import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function LiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(',')[1];
      try {
        const res = await fetch('https://avocado-app-1.onrender.com/predict_base64', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_base64: base64 }),
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setResult({ error: 'Failed to connect to server' });
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <section id="demo" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4CAF50] font-semibold text-sm tracking-widest uppercase">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Try It Now</span>
          </h2>
          <p className="text-[#a5d6a7] max-w-xl mx-auto">
            Upload an avocado photo and see our AI analysis in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          {!result ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-[#4CAF50] bg-[rgba(76,175,80,0.05)]'
                  : 'border-[rgba(76,175,80,0.3)] hover:border-[#4CAF50]'
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#4CAF50] opacity-60" />
              <p className="text-[#c8e6c9] mb-2 font-medium">
                Drag & drop your avocado photo here
              </p>
              <p className="text-[#81c784] text-sm mb-6">
                or click to browse — JPG, PNG up to 10MB
              </p>
              <label className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-[#0a0f0d] font-semibold cursor-pointer hover:shadow-[0_0_25px_rgba(76,175,80,0.4)] transition-all duration-300">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
          ) : uploading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#4CAF50] animate-spin" />
              <p className="text-[#c8e6c9]">Analyzing your avocado...</p>
            </div>
          ) : (
            <div className="text-center">
              {result.error ? (
                <div className="py-8">
                  <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <p className="text-red-300">{result.error}</p>
                  <button
                    onClick={() => setResult(null)}
                    className="mt-4 px-6 py-2 rounded-full glass text-[#c8e6c9] hover:border-[#4CAF50] transition-all"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[#4CAF50]" />
                  <h3 className="text-2xl font-bold mb-2 text-[#e8f5e9]">
                    Analysis Complete
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="glass rounded-2xl p-4">
                      <div className="text-xs text-[#81c784] mb-1">Ripeness</div>
                      <div className="text-2xl font-bold text-[#4CAF50]">
                        {result.ripeness || 'N/A'}
                      </div>
                    </div>
                    <div className="glass rounded-2xl p-4">
                      <div className="text-xs text-[#81c784] mb-1">Quality</div>
                      <div className="text-2xl font-bold text-[#9CCC65]">
                        {result.quality || 'N/A'}
                      </div>
                    </div>
                    <div className="glass rounded-2xl p-4 col-span-2">
                      <div className="text-xs text-[#81c784] mb-1">Recommendation</div>
                      <div className="text-[#c8e6c9]">{result.recommendation || 'N/A'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="mt-6 px-6 py-2 rounded-full glass text-[#c8e6c9] hover:border-[#4CAF50] transition-all"
                  >
                    Analyze Another
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}