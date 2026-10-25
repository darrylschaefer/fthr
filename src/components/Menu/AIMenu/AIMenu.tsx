import { Dispatch, SetStateAction } from 'react';
import useStore from '@store/store';
import ChatContent from '@components/Chat/ChatContent/ChatContent';
import AgentChat from '@components/Menu/DocumentMenu/AgentChat';
import PromptMenuContent from './PromptLibrary/PromptMenuContent';
import MetaMenu from './MetaMenu';
import NotesView from './Notes/NotesView';
import DocumentHistory from './History/DocumentHistory';
import VersionSwitcher from '@components/Document/EditorComponents/VersionSwitcher';
import ToolsPanel from '@components/Tools/ToolsPanel';
import './assistant-sections.css';

interface AIMenuProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

const AIMenu = ({ activeMenu, setActiveMenu }: AIMenuProps) => {
  const selectedAgentId = useStore(state => state.selectedAgentId);
  const activeConversation = useStore(state => state.getActiveConversation());
  const document = useStore(state => state.chats?.[state.currentChatIndex]);
  const setVersion = useStore(state => state.setDocumentVersion);
  return (
    <div className="workspace-pane-content">
      {activeMenu === 'versions' ? <VersionSwitcher currentVersion={document?.currentVersion || 'Draft'} onVersionChange={version => document ? setVersion(document.id, version) : undefined} />
      : activeMenu === 'tools' ? <ToolsPanel /> : activeMenu === 'history' ? <DocumentHistory /> : activeMenu === 'notes' ? <NotesView /> : activeMenu === 'meta' ? <MetaMenu /> : activeMenu === 'actions' ? (
        <PromptMenuContent setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      ) : activeConversation || selectedAgentId ? <AgentChat /> : <ChatContent />}
    </div>
  );
};

export default AIMenu;
