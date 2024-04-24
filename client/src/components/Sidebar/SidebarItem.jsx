const SidebarItem = ({ icon, onClick }) => (
  <button
    className="flex items-center justify-center h-12 w-12 mb-2 mx-auto text-white hover:text-gray-300"
    onClick={onClick}
  >
    <span className="text-2xl text-white">{icon}</span>
  </button>
);
export default SidebarItem;
