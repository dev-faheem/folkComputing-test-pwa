import { FC, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.css";
import { Card, Container, DropDown } from "../../components";
import { Link } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import TextInput from "../../components/inputs/text-input";

const Chat: FC = (): ReactElement => {
  const [messages, setMessages] = useState<any>([]);
  const [value, setValue] = useState<string>("");

  const [language, setLanguage] = useState<string>("en");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      ...messages,
      {
        user: "ASSISTENT",
        message: "Hi i am assistant! \n How can I help you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    setMessages([...messages, { user: "MY_MESSAGE", message: value }]);
    setValue("");
  };

  return (
    <Container className=" sm:max-w-md max-sm:p-0 h-screen w-screen">
      <Card className="p-6 overflow-hidden shadoww-full h-full flex flex-col justify-between border relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-grow sm:pt-0 relative">
            <DropDown
              options={[
                { label: "English", value: "en" },
                { label: "Arabic", value: "ar" },
              ]}
              selectValue={(language) => setLanguage(language)}
              selectedoption={
                [
                  { label: "English", value: "en" },
                  { label: "Arabic", value: "ar" },
                ].find(({ value }) => value === language)?.label ?? ""
              }
              placeholder={"Select language"}
            />
          </div>
          <Link to="/login">
            <div className=" bg-[#E11934] p-2 w-18 h-18 rounded ms-4">
              <ArrowRightStartOnRectangleIcon className="w-8 text-white " />
            </div>
          </Link>
        </div>

        <div className="mt-5 h-full overflow-scroll no-scrollbar">
          {messages?.map((item: any, index: number) => {
            const { user, message } = item;
            return user == "ASSISTENT" ? (
              <div key={index} className={`flex justify-start`}>
                <div className="w-4 h-4 bg-[#E11934] rounded-full me-2" />
                <div className="bg-yellow-200 rounded-l-md rounded-tr-md p-3 mb-1">
                  <p className="max-w-40 h-auto text-start ">{message}</p>
                </div>
              </div>
            ) : (
              <div key={index} className={`flex justify-end  h-auto`}>
                <div className="bg-purple-200 rounded-r-md rounded-tl-md p-3 mb-1">
                  <p className="max-w-40 h-auto text-end">{message}</p>
                </div>
                <div className="w-4 h-4 bg-[#e18a19] rounded-full ml-2" />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="border rounded-md pe-2 flex items-center justify-between mt-2 bg-gray-100">
          <TextInput
            inputType="text"
            placeholder="Message..."
            required={false}
            id="message"
            labelClass="mb-4"
            onInvalidMessage="Email"
            inputClass="inputfield border-none p-0"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={handleKeyDown}
          />
          <PaperAirplaneIcon
            type="button"
            className="w-6 ml-2 text-[#E11934]"
            onClick={sendMessage}
          />
        </div>
      </Card>
    </Container>
  );
};

export default Chat;
