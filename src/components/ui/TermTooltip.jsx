import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export function TermTooltip({ term, query = term, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const fetchSummary = async () => {
    if (data) return; // already fetched
    setLoading(true);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.extract) {
        setData({
          title: json.title,
          extract: json.extract,
          thumbnail: json.thumbnail?.source
        });
      } else {
        setData({ title: term, extract: "No simple definition found. Please consult your local election office." });
      }
    } catch (e) {
      setData({ title: term, extract: "Could not fetch definition at this time." });
    }
    setLoading(false);
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      fetchSummary();
    }, 300); // 300ms delay to avoid accidental triggers
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  return (
    <span 
      className="relative inline-flex items-center gap-0.5 text-primary font-medium border-b border-dashed border-primary/40 cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children || term} <Info size={11} className="opacity-70" />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-white rounded-claude shadow-warm-md border border-surface-border pointer-events-none text-left"
          >
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data ? (
              <div>
                <div className="flex gap-2.5 mb-2 items-center">
                  {data.thumbnail && (
                    <img src={data.thumbnail} alt={data.title} className="w-8 h-8 object-cover rounded" />
                  )}
                  <h4 className="font-semibold text-ink text-sm m-0">{data.title}</h4>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed m-0">
                  {data.extract}
                </p>
                <div className="text-[10px] text-ink-faint mt-2 pt-2 border-t border-surface-border flex justify-between items-center">
                  <span>Wikipedia Reference</span>
                  <span className="bg-surface px-1.5 py-0.5 rounded border border-surface-border uppercase tracking-widest text-[8px]">ECI Helper</span>
                </div>
              </div>
            ) : null}
            
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[6px] border-transparent border-t-white" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-surface-border -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
