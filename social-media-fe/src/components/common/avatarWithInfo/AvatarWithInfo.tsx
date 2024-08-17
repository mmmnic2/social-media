import SocialAvatar from "../avatar/SocialAvatar";

const AvatarWithInfo = ({
  imgUrl,
  status,
  alt,
  title,
  subtitle,
}: {
  imgUrl: string;
  status?: string;
  alt: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <SocialAvatar imgUrl={imgUrl} alt={alt} status={status} />
      <div className="">
        <h5>{title}</h5>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default AvatarWithInfo;
