#include <node.h>
#include <v8.h>

#include <unistd.h>

#include "base64.h"
#include "amuz-crypt.h"

#define KEY_SIZE 16

using namespace v8;
using namespace std;

int byte_cmp(const char *str1, const char *str2, uint32_t size){
	uint32_t result = -1;
	for(uint32_t i = 0; i < size; i++){
		result = str1[i] - str2[i];
		if(result != 0){
			break;
		}
	}
	return result;
}

char* decode_base64(const char *encoded_text, uint32_t *decoded_text_size){
	switch(strlen(encoded_text)){
	case 24:
		*decoded_text_size = 16;
		break;
	case 44:
		*decoded_text_size = 32;
		break;
	case 64:
		*decoded_text_size = 48;
		break;
	}
	
	char *decoded_text = (char*)malloc(*decoded_text_size * sizeof(char));
	assert(decoded_text != NULL);

	Base64decode(decoded_text, encoded_text);
	return decoded_text;
}

char* encode_base64(const char *plain_text, const uint32_t plain_text_size){
	char *encoded_text = (char*)malloc(sizeof(char) * Base64encode_len(plain_text_size));
	assert(encoded_text != NULL);

	Base64encode(encoded_text, plain_text, Base64encode_len(plain_text_size));
	return encoded_text;
}

char* crypt_text(const char *text, const uint32_t text_size, const uint8_t mode){
	const char key[KEY_SIZE] = {0x61, 0x6D, 0x75, 0x7A, 0x6C, 0x61, 0x62, 0x5F, 0x32, 0x30, 0x31, 0x35, 0x31, 0x32, 0x31, 0x34};
	const char iv[KEY_SIZE] = {0x49, 0x56, 0x41, 0x4d, 0x55, 0x5a, 0x4c, 0x41, 0x42, 0x41, 0x55, 0x54, 0x48, 0x4b, 0x45, 0x59};
	
	CRYPT_INFO crypt_info = {
		text: text,
		text_size: text_size,
		key: key,
		key_size: KEY_SIZE,
		iv: iv,
		iv_size: KEY_SIZE
	};
	char *crypted_text = crypt_templete(crypt_info, mode);
	return crypted_text;
}

char** tokenize(const char *text, const uint32_t text_size, uint32_t *tokenized_size){
	const char token[2] = "|";
	
	char *text_temp = (char*)malloc(text_size * sizeof(char));
	assert(text_temp != NULL);
	memmove(text_temp, text, text_size);
	
	char *temp = strtok(text_temp, token);
	char* *results = NULL;

	do{
		results = (char**)realloc(results, ((*tokenized_size) + 1) * sizeof(char*));
		assert(results != NULL);
		results[*tokenized_size] = temp;
		(*tokenized_size)++;
	}while((temp = strtok(NULL, token)) != NULL);
	
	return results;
}

void encrypt(const FunctionCallbackInfo<Value>& args){
	Isolate *isolate = Isolate::GetCurrent();
	HandleScope scope(isolate);
	
	if(args.Length() < 1){
		isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong nuber of arguments")));
	}

	String::Utf8Value arg_encoded_text(args[0]->ToString());
	const char *plain_text = *arg_plain_text;

	char *encrypted_text = decrypt_text(plain_text, strlen(plain_text));
	char *encoded_text = encode_base64(encrypted_text, strlen(plain_text));

	args.GetReturnValue().Set(String::NewFormUtf8(isolate, encoded_text));
}

void decrypt(const FunctionCallbackInfo<Value>& args){}

void Init(Handle<Object> exports){
	Isolate *isolate = Isolate::GetCurrent();
	exports->Set(String::NewFromUtf8(isolate, "encrypt"), FunctionTemplate::New(isolate, encrypt) -> GetFunction());	
	exports->Set(String::NewFromUtf8(isolate, "decrypt"), FunctionTemplate::New(isolate, decrypt) -> GetFunction());	
}

NODE_MODULE(crypt, Init);
