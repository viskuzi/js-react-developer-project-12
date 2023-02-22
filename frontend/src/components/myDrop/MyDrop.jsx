/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import Remove from '../../modals/removeChannel/RemoveChannel';
import Rename from '../../modals/renameChannel/RenameChannel';

const MyDrop = ({ isActive, isRemovable, id }) => {
  const [isRemoveOpen, setRemoveOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickRemove = () => {
    setRemoveOpen(true);
  };

  const handleClickRename = () => {
    setRenameOpen(true);
  };

  return (
    <>
      {isRemovable && (
        <Dropdown>
          <Dropdown.Toggle variant={isActive && 'secondary'} id="dropdown-basic">
            <span className="visually-hidden">{t('Channel management')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClickRemove}>{t('Remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleClickRename}>{t('Rename')}</Dropdown.Item>
          </Dropdown.Menu>
          <Rename id={id} isShownRename={isRenameOpen} setShownRename={setRenameOpen} />
          <Remove id={id} isShownRemove={isRemoveOpen} setShownRemove={setRemoveOpen} />
        </Dropdown>
      )}
    </>
  );
};

export default MyDrop;
