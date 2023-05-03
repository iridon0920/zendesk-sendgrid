export function sendEmailBySendGrid(client) {
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
          to: [
            {
              email: "irii.keita@classmethod.jp",
            },
          ],
          subject: "test",
        },
      ],
      from: {
        email: "irii.keita@classmethod.jp",
      },
      content: [
        {
          type: "text/plain",
          value: "test",
        },
      ],
    }),
    secure: true,
  };
  this._client.request(options).then((res) => {
    console.log(res);
  });
}
