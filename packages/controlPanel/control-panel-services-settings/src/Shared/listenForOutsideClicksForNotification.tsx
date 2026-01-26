export default function listenForOutsideClicks(listening: any, setListening: any, menuRef: any, updateState: any) {
    const handleClickOutside = (evt: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(evt.target)) return;
      else if (menuRef.current && !menuRef.current.contains(evt.target)) {
        updateState();
        setListening(false);
        document.removeEventListener("click", handleClickOutside);
      }
    };

    return () => {
      if (listening) return;
      if (!menuRef.current) return;
      setListening(true);
      document.addEventListener("click", handleClickOutside);
    };
  };