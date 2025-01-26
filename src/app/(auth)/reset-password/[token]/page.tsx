import ResetPasswordForm from "@/components/ResetPasswordForm";

type ResetPasswordProps = {
  params: {
    token: string;
  };
};

export async function ResetPassword({ params }: ResetPasswordProps) {
  const { token } = await params;

  return (
    <div>
      {token ? (
        <ResetPasswordForm token={token as string} />
      ) : (
        <p>Invalid or missing token</p>
      )}
    </div>
  );
}

export default ResetPassword;
