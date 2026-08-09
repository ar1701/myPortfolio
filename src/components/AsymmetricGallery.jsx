import './AsymmetricGallery.css';

const AsymmetricGallery = ({ items, sectionId, title }) => {
  return (
    <section id={sectionId} className="gallery-section container">
      <h2 className="section-title text-gradient">{title}</h2>
      
      <div className="masonry-grid">
        {items.map((item, index) => {
          // Add classes to make the grid asymmetric
          let blockClass = 'gallery-item glass-interactive glass';
          if (index % 5 === 0) blockClass += ' span-2 row-2'; // Large block
          else if (index % 3 === 0) blockClass += ' span-2'; // Wide block
          else if (index % 4 === 0) blockClass += ' row-2'; // Tall block

          return (
            <div key={index} className={blockClass}>
              <div className="gallery-item-inner">
                {item.image && (
                  <div className="gallery-image-container">
                    <img src={item.image} alt={item.title} className="gallery-image" />
                    {item.link && (
                      <div className="gallery-overlay">
                        <a href={item.link} target="_blank" rel="noreferrer" className="gallery-link">
                          Visit <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="gallery-content">
                  <h3 className="item-title">{item.title}</h3>
                  {item.subtitle && <p className="item-subtitle text-accent">{item.subtitle}</p>}
                  {item.period && <span className="item-period">{item.period}</span>}
                  
                  <p className="item-description">{item.description}</p>
                  
                  {item.tags && (
                    <div className="tech-tags">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="tech-tag glass">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  {item.bullets && (
                    <ul className="details-list">
                      {item.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AsymmetricGallery;
