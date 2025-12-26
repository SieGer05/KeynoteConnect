const Footer = () => {
   return (
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <p className="text-center text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} - Copyright by: DJILI Mohamed Amine
         </p>
         </div>
      </footer>
   );
};

export default Footer;