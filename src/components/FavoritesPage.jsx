import BackButton from './BackButton';
import VitaminCard from './VitaminCard';
import { useFavorites } from '../hooks';

export default function FavoritesPage({ onNavigate }) {
  const { favorites, loading, toggleFavorite } = useFavorites();

  const toggleArgsFor = (fav) => ({
    category: { id: fav.categoryId, label: fav.categoryLabel, emoji: fav.categoryEmoji, color: fav.categoryColor },
    vitamin: { scripture: fav.scripture, quote: fav.quote, day: fav.isBonus ? undefined : fav.day },
    dayLabel: fav.dayLabel,
  });

  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 30% 70%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:900, margin:'0 auto'}}>
        <BackButton onNavigate={onNavigate}/>
        <h2 style={{
          fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff',
          marginBottom:24, fontWeight:700, textAlign:'center',
        }}>Your Favorites</h2>

        {!loading && favorites.length === 0 && (
          <p style={{
            fontFamily:'DM Sans', fontSize:15, color:'rgba(233,213,255,0.5)',
            textAlign:'center',
          }}>No favorites yet — tap ♡ on any vitamin.</p>
        )}

        <div style={{display:'flex', flexWrap:'wrap', gap:20, justifyContent:'center'}}>
          {favorites.map(fav => (
            <VitaminCard
              key={fav.id}
              vitamin={{ verse: fav.scripture.verse, ref: fav.scripture.ref }}
              category={{ id: fav.categoryId, label: fav.categoryLabel, emoji: fav.categoryEmoji, color: fav.categoryColor }}
              dayLabel={fav.dayLabel}
              favorited
              onToggleFavorite={() => toggleFavorite(toggleArgsFor(fav))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
