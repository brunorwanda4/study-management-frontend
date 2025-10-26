import type { Locale } from "@/i18n";
import MessageAsideBody from "./message-aside-body";
import MessagesAsideNavbar from "./message-aside-navbar";

// import AsideSearch from "@/components/cards/aside-search";

interface props {
  lang: Locale;
}

const MessagesAside = ({ lang }: props) => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex right-0 z-40">
      <div className="w-full border-l border-l-base-content/20">
        {/* <AsideSearch /> */}
        <MessagesAsideNavbar  />
        <div className=" max-h-[75vh] overflow-y-auto">
          <MessageAsideBody lang={lang} />
        </div>
        <div />
      </div>
    </aside>
  );
};

export default MessagesAside;
