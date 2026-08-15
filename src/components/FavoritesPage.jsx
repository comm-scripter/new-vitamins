import BackButton from './BackButton';
import VitaminCard from './VitaminCard';
import { useFavorites } from '../hooks';
import { CATEGORIES } from '../data';

export default function FavoritesPage({ onNavigate }) {
  const { favorites, loading } = useFavorites();

  // Favorite docs only store id/label/emoji/color (see hooks.js toggleFavorite),
  // not the category's image, so look the live category up by id to get its
  // badge image instead of always falling back to the generic capsule icon.
  const categoryFor = (fav) => CATEGORIES.find(c => c.id === fav.categoryId) ?? {
    id: fav.categoryId, label: fav.categoryLabel, emoji: fav.categoryEmoji, color: fav.categoryColor,
  };

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
              category={categoryFor(fav)}
              dayLabel={fav.dayLabel}
              size={130}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
