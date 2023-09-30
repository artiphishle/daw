import t from "@/app/core/i18n";

enum EMessageType {
  Info = "info",
  Error = "error",
  Success = "success",
}
interface IMessageProps {
  message: string;
  title?: string;
  type?: EMessageType;
  writeLog?: boolean;
}
const Template = ({
  type = EMessageType.Info,
  message,
  title,
  writeLog = false,
}: IMessageProps) => {
  const h1 = title || t(type);
  const action = type === EMessageType.Success
? EMessageType.Info
: type;

  if (writeLog) console[action](h1, message);

  return (
    // TODO add optional icon
    <section>
      <h1 className="font-bold text-xl">{h1}</h1>
      <p>{message}</p>
    </section>
  );
};

const ErrorMessage = (props: IMessageProps) => {
  const p = { ...props, type: EMessageType.Error };
  return <Template {...p} />;
};
const InfoMessage = (props: IMessageProps) => {
  const p = { ...props, type: EMessageType.Info };
  return <Template {...p} />;
};

const SuccessMessage = (props: IMessageProps) => {
  const p = { ...props, type: EMessageType.Success };
  return <Template {...p} />;
};

export { ErrorMessage, InfoMessage, SuccessMessage };
