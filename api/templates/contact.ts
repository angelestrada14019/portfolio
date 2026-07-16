interface ContactEmailData {
  name: string
  email: string
  message: string
}

export function contactEmailHtml({ name, email, message }: ContactEmailData): string {
  return `
    <div style="background:#FBFAF8;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #E6E1D9;overflow:hidden;">

        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#14110F;">
          <tr>
            <td style="padding:20px 28px;">
              <span style="color:#FBFAF8;font-family:Georgia,serif;font-size:15px;font-weight:bold;">Angel Estrada — Portfolio</span>
            </td>
          </tr>
        </table>

        <div style="padding:28px 28px 24px;">

          <div style="display:inline-block;background:#C9E8E5;color:#0D6B65;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:3px 10px;border-radius:100px;margin-bottom:16px;">
            New message
          </div>

          <h2 style="font-family:Georgia,serif;font-size:22px;color:#14110F;margin:0 0 24px;font-weight:600;line-height:1.3;">
            New contact form submission
          </h2>

          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 16px 10px 0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#6F6A64;width:80px;border-top:1px solid #E6E1D9;vertical-align:top;">Name</td>
              <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:15px;color:#14110F;border-top:1px solid #E6E1D9;vertical-align:top;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 16px 10px 0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#6F6A64;border-top:1px solid #E6E1D9;border-bottom:1px solid #E6E1D9;vertical-align:top;">Email</td>
              <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:15px;border-top:1px solid #E6E1D9;border-bottom:1px solid #E6E1D9;vertical-align:top;">
                <a href="mailto:${email}" style="color:#1752CC;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>

          <p style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#6F6A64;margin:0 0 10px;">Message</p>
          <div style="background:#F4F1EC;border-left:3px solid #1752CC;border-radius:0 6px 6px 0;padding:14px 18px;margin-bottom:24px;">
            <p style="font-family:Arial,sans-serif;font-size:15px;color:#14110F;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display:inline-block;background:#1752CC;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:11px 22px;border-radius:7px;">
            Reply &rarr;
          </a>

        </div>

      </div>
    </div>
  `
}
