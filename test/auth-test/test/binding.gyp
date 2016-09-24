{
	"targets":[
		{
			"target_name": "certification",
			"sources": ["certification.cc", "amuz-crypt.cc", "base64.cc"],
			"libraries":[
				"-L.", "-lmcrypt"
			]
		}
	]
}
