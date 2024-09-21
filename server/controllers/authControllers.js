
const nodemailer=require('nodemailer')
const signJWT=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET)
}

 let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'codeetgo@gmail.com',
                pass:"ajtr hgyi yqsz tkgv"
            }
        })
// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { 
appearance,
communicationSkills,
email,
emotionalIntelligence,
ethics,
phone,
sexualCompatibility,
sharedGoals} = req.body;
        
        // Check if the user already exists
       
        let mailOptions = {
    from: '"His Royal Highness, King Leul" <kingleul@royaldating.com>',
    to: email,
    subject: '👑 Royal Decree: Your Dating Application Has Been Approved! 🎉',
    text: "Congratulations! You've been deemed worthy to date royalty!",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid gold; border-radius: 10px;">
        <h1 style="color: #4B0082; text-align: center;">�trumpet sounds🎺</h1>
        <h2 style="color: #4B0082; text-align: center;">Hear Ye, Hear Ye!</h2>
        <p>Dearest Potential Queen,</p>
        <p>
        It is with great pleasure and a touch of royal amusement that we inform you of your successful application to date the legendary, the incomparable, the man who puts the "king" in "joking" - His Royal Highness, King Leul! 👑😎
        </p>
        <p>
        By royal decree, you are hereby granted the following titles and privileges:
        </p>
        <ul>
            <li>Official Tea-Taster to the King (he's very picky about his Earl Grey) ☕</li>
            <li>Royal Meme Consultant (your Netflix and chill game better be strong) 📺</li>
            <li>Grand Keeper of the King's Dad Jokes (it's a tough job, but someone's gotta laugh) 🤣</li>
        </ul>
        <p>
        From this day forth, you shall count yourself among the ranks of legendary queens. Move over, Cleopatra! Step aside, Sheba! There's a new royal in town, and they've got a date with destiny (and King Leul)!
        </p>
        <p>
        Please note: The Royal Wardrobe Department kindly requests that you arrive for your date in your finest attire. Bonus points if your outfit somehow incorporates the official royal colors: purple, gold, and "Is that mustard on your shirt or are you just happy to see me?" yellow.
        </p>
        <p>
        We eagerly await your RSVP. Remember, in the immortal words of King Leul himself: "To date or not to date, that is not even a question, because I'm awesome!" 🕺
        </p>
        <p style="text-align: center; font-style: italic;">
        Yours in royal jest and genuine excitement,<br>
        The Royal Matchmaking Committee
        </p>
        <p style="font-size: 12px; text-align: center; color: #888;">
        P.S. This email will self-destruct in 5 seconds. Just kidding! But wouldn't that be cool? 💥
        </p>
    </div>
    `
};
         let mailOptions2 = {
    from: '"Royal Dating Intelligence Agency" <noreply@royaldating.com>',
    to: 'leulmelkamu15@gmail.com',
    subject: '👑 New Queen Candidate Intel Report 🕵️‍♂️',
    text: "A new dating application has been submitted. Here's the intel, Your Majesty.",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid purple; border-radius: 10px;">
        <h1 style="color: #4B0082; text-align: center;">👑 Royal Intel: Potential Queen Alert 👑</h1>
        
        <p>Your Majesty,</p>
        
        <p>Our royal spies... err, I mean, our highly sophisticated dating algorithms have gathered the following intelligence on your latest admirer:</p>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #E6E6FA;">
                <th style="padding: 10px; text-align: left; border: 1px solid #4B0082;">Attribute</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #4B0082;">Intel</th>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #4B0082;">Appearance</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${appearance}</td>
            </tr>
            <tr style="background-color: #E6E6FA;">
                <td style="padding: 10px; border: 1px solid #4B0082;">Communication Skills</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${communicationSkills}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #4B0082;">Emotional Intelligence</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${emotionalIntelligence}</td>
            </tr>
            <tr style="background-color: #E6E6FA;">
                <td style="padding: 10px; border: 1px solid #4B0082;">Moral Compass</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${ethics}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #4B0082;">Bedroom Harmony</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${sexualCompatibility}</td>
            </tr>
            <tr style="background-color: #E6E6FA;">
                <td style="padding: 10px; border: 1px solid #4B0082;">Life Goals</td>
                <td style="padding: 10px; border: 1px solid #4B0082;">${sharedGoals}</td>
            </tr>
        </table>
        
        <h2 style="color: #4B0082; margin-top: 20px;">Royal Contact Intel</h2>
        <p><strong>Email Pigeon:</strong> ${email}</p>
        <p><strong>Royal Hotline:</strong> ${phone}</p>
        
        <p style="font-style: italic; margin-top: 20px;">
        Remember, Your Majesty, with great power comes great responsibility... and potentially awkward first dates.
        </p>
        
        <p style="text-align: center; font-weight: bold;">
        May your reign be long and your pick-up lines be strong!
        </p>
        
        <p style="font-size: 12px; text-align: center; color: #888;">
        This message will self-destruct after reading. Just kidding, we don't have that technology... yet.
        </p>
    </div>
    `
};
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(400).json({
                    status:400,
                    message:"An Error Occurred"
                })
            }
            
        })   
        transporter.sendMail(mailOptions2,(error,info)=>{
            if(error){
                res.status(400).json({
                    status:400,
                    message:"An Error Occurred"
                })
            }
            
        })
        res.status(200).json({status:200,
        message:"Email sent successfully.",
    })  
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};
