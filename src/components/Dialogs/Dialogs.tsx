import { FC } from 'react';
import style from './Dialogs.module.css'
import { NavLink, Route, Routes } from 'react-router-dom';
import ConversationsContainer from './Conversations/ConversationsContainers';

interface DialogsProps {
    dialogs: { id: number; name: string }[];
}

const Dialogs: FC<DialogsProps> = ({ dialogs }) => {

    return (
        <div className={style.dialogs}>
            <h1>Dialogs</h1>
            <div className={style.dialogsContainer}>
                <ul className={style.dialogsElements}>
                    {dialogs.map(dialog =>
                        <li className={style.dialogsElContainer} key={dialog.id}>
                            <NavLink to={`/dialogs/${dialog.id}`}
                                className={({ isActive }) => isActive ? style.active : ''}>
                                {dialog.name}
                            </NavLink>
                        </li>)}
                </ul>
                <div>
                    <Routes>
                        {dialogs.map(conversation =>
                            <Route key={conversation.id} path={`${conversation.id}`}
                                element={<ConversationsContainer name={conversation.name} />} />)}
                    </Routes>
                </div>
            </div >
        </div >
    );
};

export default Dialogs;