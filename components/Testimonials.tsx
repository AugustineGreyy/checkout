import React from 'react';

const testimonials = [
  "https://i.postimg.cc/X79Yn4tb/adamma-akabogu1n-a-1743449528-jpg-selar-com-20250331073208.jpg",
  "https://i.postimg.cc/vZz86XQ2/adamma-akabogu1n-a-1743449511-jpg-selar-com-20250331073151.jpg",
  "https://i.postimg.cc/0NX8VQKp/adamma-akabogu1n-a-1745733864-jpg-selar-com-20250427060424.jpg",
  "https://i.postimg.cc/637BgXCF/adamma-akabogu1n-a-1748108046-jpg-selar-com-20250524053406.jpg",
  "https://i.postimg.cc/0jDP50Wf/adamma-akabogu1n-a-1748108317-jpg-selar-com-20250524053837.jpg",
  "https://i.postimg.cc/J4CR6S0d/adamma-akabogu1n-a-1745733914-jpg-selar-com-20250427060514.jpg",
  "https://i.postimg.cc/mgbBRMQY/adamma-akabogu1n-a-1748108131-jpg-selar-com-20250524053531.jpg",
  "https://i.postimg.cc/KjShWgGg/peacepassiveincomen-a-1741632151-jpeg-selar-com-20250310064231.jpg",
  "https://i.postimg.cc/Wb8xGykZ/esther-kanu1n-a-1745326735-jpeg-selar-com-20250422125855.jpg",
];

const Testimonials: React.FC = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full pb-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-dark mb-12">Let the reviews speak for themselves</h2>
      </div>
      <div 
        className="scroller"
        style={{
            maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)'
        }}
      >
        <div className="flex gap-6 animate-scroll">
          {duplicatedTestimonials.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-light rounded-2xl shadow-card overflow-hidden">
              <img
                src={src}
                alt={`Testimonial ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
