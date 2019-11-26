//-----REGISTRATION-----

router.post("/CreateAccount", urlencodedParser, (req, res) => {
  usersMod;
	if(!req.body) return res.sendStatus(400);
	let account = new usersMod();
	account.email = req.body.email;
	account.password = req.body.password;
	account.urlPic = req.body.urlPic;

	account.save((err, accountStored) => {
		if(err) res.status(500).send({message: `Error posting to DB: ${err}`})
		//res.status(200).send({account: accountStored})
		res.status(200).redirect('/MYtinerary')
	})
});
//------------------------
