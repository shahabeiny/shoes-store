import { memo, FC } from 'react';
import './HistoryModal.css';
import { UserHistoryModel } from 'models/UserModel';
import { formatDate } from 'utilities/formatDate';
import DetailModal from '../ModalBase/DetailModal';

type HistoryModalProps = {
  onHide: () => void;
  histories: UserHistoryModel[]|null;
};

const HistoryModal: FC<HistoryModalProps> = ({ histories, onHide }) => {
  return (
    <DetailModal onHide={onHide}>
      <div className="history-modal">
        {histories?.map((history) => (
          <div className="history-modal__wrapper">
            <span className="history-modal__title">{formatDate(history.createdAt ?? '')}</span>
            <span className="history-modal__ip">({`آی پی : ${history.ip}`})</span>
            <div className="history-modal_devices">
              <span className="history-modal_device" title={history.versionBrowser}>
                {history.browser}
              </span>
              <span className="history-modal_device" title={history.versionOs}>
                {`${history.os}  ${history.versionOs}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DetailModal>
  );
};

export default memo(HistoryModal);
