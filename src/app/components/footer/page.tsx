const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-gray-800 font-medium text-sm md:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>

        <div className="text-gray-500 italic text-xs md:text-sm">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </div>
      </div>
    </footer>
  );
};
export default Footer;
