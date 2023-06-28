export const sendEmailBySendGrid = async (
  client: any,
  emails: string[],
  text: string
) => {
  // sendgridでメールを送信する
  const options = {
    url: "https://api.sendgrid.com/v3/mail/send",
    type: "POST",
    headers: {
      Authorization: "Bearer {{setting.sendgridApiKey}}",
    },
    contentType: "application/json",
    data: JSON.stringify({
      personalizations: [
        {
          to: emails.map((email) => ({ email })),
          subject: "test",
        },
      ],
      from: {
        email: "irii.keita@classmethod.jp",
      },
      content: [
        {
          type: "text/plain",
          value: text,
        },
      ],
    }),
    secure: true,
  };
  const res = await client.request(options);
  console.log(res);
};
