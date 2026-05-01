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
      className="relative inline-flex items-center gap-1 text-primary-dark border-b border-dashed border-primary cursor-help mx-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children || term} <Info size={14} className="text-primary opacity-70" />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 md:w-80 p-4 bg-white rounded-lg shadow-xl border border-gray-100 pointer-events-none text-left"
          >
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data ? (
              <div>
                <div className="flex gap-3 mb-2">
                  {data.thumbnail && (
                    <img src={data.thumbnail} alt={data.title} className="w-12 h-12 object-cover rounded-md" />
                  )}
                  <h4 className="font-bold text-gray-900 text-base m-0">{data.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed m-0 line-clamp-4">
                  {data.extract}
                </p>
                <div className="text-xs text-gray-400 mt-2 text-right">Source: Wikipedia</div>
              </div>
            ) : null}
            
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
