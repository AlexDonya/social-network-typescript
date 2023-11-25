import { ChangeEvent, FC } from 'react';
import style from './Conversations.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessage, selectConversations,
    selectNewMessageText, updateNameTarget, updateNewMessageText
} from '../../../redux/dialogsSlice';
import Conversations from './Conversations';
import { AppDispatch } from '../../../redux/store';

interface ConversationsContainerProps {
    name: string;
}

const ConversationsContainer: FC<ConversationsContainerProps> = ({ name }) => {
    const dispatch: AppDispatch = useDispatch();
    const conversations = useSelector(selectConversations);
    const newMessageText = useSelector(selectNewMessageText);

    let conversation = `conversation${name}`;
    let messages = `messages${name}`;

    const handleAddMessage = () => {
        dispatch(updateNameTarget(name));
        dispatch(addMessage());
    }

    const handleUpdateNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewMessageText(e.target.value));
    }

    const messagesInterlocutor = conversations[conversation][messages].map(m =>
        <div key={m.id} className={style.messageContainer}>
            <div className={style.companionPhoto}>
                <div>{name}</div>
            </div>
            {m.message}
        </div>)

    const messagesUser = conversations[conversation].messagesUserProfile.map(m =>
        <div key={m.id} className={style.messageContainer}>
            <div className={style.myselfPhoto}>
                <div>It's me</div>
            </div>
            <div className={style.messageText}>
                {m.message}
            </div>
        </div>)

    return <Conversations messagesInterlocutor={messagesInterlocutor} messagesUser={messagesUser}
        newMessageText={newMessageText} handleUpdateNewMessageText={handleUpdateNewMessageText}
        handleAddMessage={handleAddMessage} />
}

export default ConversationsContainer;