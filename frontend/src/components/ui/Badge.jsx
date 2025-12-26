const Badge = ({ children, type }) => {
   const styles = type === 'Academic'
      ? 'bg-indigo-100 text-indigo-700 border indigo-200'
      : 'bg-emerald-100 text-emerald-700 border-emerald-200';
   
   return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
         {children}
      </span>
   );
}

export default Badge;