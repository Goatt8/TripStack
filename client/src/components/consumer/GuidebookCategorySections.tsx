import { guidebookKeywordMap } from '@/features/guidebook/constants';
import type { Guidebook, SearchKeywordOption } from '@/types';

type GuidebookCategorySectionsProps = {
  guidebooks: Guidebook[];
  keywords: SearchKeywordOption[];
  selectedGuidebook: Guidebook | null;
  onGuidebookSelect: (guidebook: Guidebook) => void;
};

const regionLabels: Record<string, string> = {
  seoul: '서울',
  gyeongju: '경주',
  jeju: '제주',
  roma: '로마',
  bangkok: '방콕',
};

const countryLabels: Record<string, string> = {
  seoul: '대한민국',
  gyeongju: '대한민국',
  jeju: '대한민국',
  roma: '이탈리아',
  bangkok: '태국',
};

export function GuidebookCategorySections({
  guidebooks,
  keywords,
  selectedGuidebook,
  onGuidebookSelect,
}: GuidebookCategorySectionsProps) {
  const visibleSections = keywords
    .filter((keyword) => keyword.id !== 'all')
    .map((keyword) => ({
      keyword,
      guidebooks: guidebooks.filter((guidebook) => guidebookKeywordMap[guidebook.region]?.includes(keyword.id)),
    }))
    .filter((section) => section.guidebooks.length > 0);

  if (visibleSections.length === 0) {
    return <p className="empty-state">조건에 맞는 가이드북이 없습니다.</p>;
  }

  return (
    <div className="category-sections">
      {visibleSections.map((section) => (
        <section className="category-guide-section" key={section.keyword.id}>
          <div className="section-heading category-section-heading">
            <div>
              <h2>{section.keyword.label} 여행 가이드</h2>
              <p>선택한 조건에 맞는 인기 가이드북을 둘러보세요.</p>
            </div>
            <span>더보기</span>
          </div>

          <div className="category-guide-rail">
            {section.guidebooks.map((guidebook) => {
              const region = regionLabels[guidebook.region] ?? guidebook.region;
              const country = countryLabels[guidebook.region] ?? guidebook.region;

              return (
                <article
                  className={selectedGuidebook?.id === guidebook.id ? 'category-guide-card active' : 'category-guide-card'}
                  key={`${section.keyword.id}-${guidebook.id}`}>
                  <button className="category-guide-select" type="button" onClick={() => onGuidebookSelect(guidebook)}>
                    <img src={guidebook.coverImageUrl} alt={`${guidebook.title} thumbnail`} />
                    <div className="category-guide-overlay">
                      <div className="category-guide-meta">
                        <span>{region}.{country}</span>
                        <strong>♡ {guidebook.printCount.toLocaleString()}</strong>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
                </div>
        </section>
      ))}
    </div>
  );
}
