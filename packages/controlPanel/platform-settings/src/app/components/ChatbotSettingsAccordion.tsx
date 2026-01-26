import { FC } from "react";

interface ChatbotSettingsAccordionProps {
  intl: { formatMessage: (message: { id: string }) => string };
  register: any;
  isSelected: string;
  setIsSelected: any;
}

const ChatbotSettingsAccordion: FC<ChatbotSettingsAccordionProps> = ({
  intl,
  register,
  isSelected,
  setIsSelected,
}) => {
  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    setIsSelected(selectedOption);
  };

  return (
    <div className="row mt-5 pt-8">
      <div className="col-6">
        <label htmlFor="ChatbotName" className="mb-5 fw-semibold fs-6">
          {intl.formatMessage({ id: "ChatbotName" })}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-file-signature h-100"></i>
            </span>
          </div>
          <input
            id="ChatbotName"
            type="text"
            className="form-control"
            placeholder={intl.formatMessage({ id: "ChatbotName" })}
            {...register("chatBotName")}
          />
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="ShowChatbot" className="mb-5 fw-semibold fs-6">
          {intl.formatMessage({ id: "ShowChatbot" })}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fad fa-eye fs-3"></i>
            </span>
          </div>
          <select
            id="ShowChatbot"
            className="form-select form-select-solid px-4 py-0 m-0"
            value={isSelected}
            onChange={handleSelectChange}
          >
            <option value="yes">{intl.formatMessage({ id: "YES" })}</option>
            <option value="no">{intl.formatMessage({ id: "NO" })}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettingsAccordion;
