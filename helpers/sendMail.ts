import nodemailer from "nodemailer";

export async function sendMail(
  userName: string,
  userEmail: string,
  verificationUrl: string
) {
  const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailData = await mailer.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: `Verify SparkleNote User Account.`,
    html: ` <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: 5px;">
        <section style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="height: 200px; background-color: #365cce; width: 100%; color: #ffffff; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
            <div style="display: flex; align-items: center; gap: 3px;">
            </div>
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="text-align: center; font-size: 1.5rem; line-height: 1.5; font-weight: normal; letter-spacing: 0.1em;">
                THANKS FOR SIGNING UP!
              </div>
              <div style="font-size: 2rem; line-height: 1.125; letter-spacing: 0.15em; text-transform: capitalize; font-weight: bold;">
                Verify your E-mail Address
              </div>
            </div>
          </div>
          <main style="margin-top: 8px; padding: 0 20px;">
            <h2 style="color: #374151;">Hello ${userName},</h2>
            <p style="margin-top: 2px; line-height: 1.75; color: #4b5563;">
                Welcome to SparkleNote, verify your Email
            </p>
            <p style="margin-top: 4px; line-height: 1.75; color: #4b5563;">
              This Link will only be valid for the next <span style="font-weight: bold;">10 minutes</span>. If the link does not work, try to login again and new verification link will be send. this login verification link:
            </p>
            <a href="${verificationUrl}" target="_blank" style="text-decoration: none;padding: 6px 12px; font-size: 0.875rem; font-weight: bold; letter-spacing: 0.1em; text-transform: capitalize; color: #ffffff; transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #ed8936; border-radius: 0.375rem; border: none; cursor: pointer; display: inline-block; margin-top: 6px;">
            Verify email
      </a>
            <p style="margin-top: 8px; color: #4b5563;">
              Thank you, <br />
              MERN NodeMailer- Mohammed Muneesh E K
            </p>
          </main>
          <p style="color: #6b7280; margin: 8px 20px;">
            This email was sent from
            <a href="sparklenoteinfo@infynno.com" style="color: #365cce; text-decoration: none; cursor: pointer;">sparklenoteinfo@infynno.com</a>
            . This is a one time mail and don't send message to this email. If you need support then contact  <a href=" sparklenotesupport@gmail.com" style="color: #365cce; text-decoration: none; cursor: pointer;"> sparklenotesupport@gmail.com
          </p>
          <footer style="margin-top: 8px;">
          <footer style="margin-top: 8px;">
          <div style="background-color: rgba(207, 213, 222, 0.6); height: 200px; display: flex; flex-direction: column; gap: 3px; justify-content: center; align-items: center;">
            <div style="text-align: center; display: flex; flex-direction: column; gap: 2px;">
              <h1 style="color: #365cce; font-weight: 600; letter-spacing: 0.05em; font-size: 1.125rem;">Get in touch</h1>
              <a href="tel:+91-848-883-8308" style="color: #6b7280; text-decoration: none;">+91-848-883-8308</a>
              <a href="mailto:sales@infynno.com" style="color: #6b7280; text-decoration: none;"> sparklenotesupport@gmail.com</a>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
              <a href="#">
                <!-- FacebookIcon SVG would go here, but since it's a complex SVG, it's better to keep it as an image -->
              </a>
              <a href="#">
                <!-- LinkedinIcon SVG would go here, but since it's a complex SVG, it's better to keep it as an image -->
              </a>
              <a href="#">
                <!-- InstagramIcon SVG would go here, but since it's a complex SVG, it's better to keep it as an image -->
              </a>
            </div>
          </div>
          <div style="background-color: #365cce; padding: 10px 0; color: #ffffff; text-align: center;">
            <p style="margin-top: 3px;">© 2024 sparkleNote. All Rights Reserved.</p>
          </div>
        </footer>
        </section>
      </div>`,
  });
  return mailData;
}
