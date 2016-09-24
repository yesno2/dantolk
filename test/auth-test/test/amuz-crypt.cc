#include "amuz-crypt.h"

char* substring(const char *text, const uint32_t start_index, const uint32_t end_index){
	char *sub_string = (char*)malloc(end_index - start_index + 1);
	assert(sub_string != NULL);

	for(uint32_t i = start_index; i <= end_index; i++){
		sub_string[i - start_index] = text[i];
	}
	return sub_string;
}

char** multi_string_by_block_size(const char *text, const uint32_t text_size, const uint32_t block_size, uint32_t *multi_size, uint8_t mode){
	*multi_size = text_size % block_size == 0 ? text_size / block_size : (text_size > block_size ? (text_size / block_size) + 1 : 1);
	char* *result = (char**)malloc(sizeof(char*) * *multi_size);
	assert(result != NULL);

	for(uint32_t i = 0; i < *multi_size; i++){
		result[i] = substring(text, i * block_size, (i + 1) * block_size - 1);
		if(mode == ENCRYPT_MODE && i == (*multi_size) - 1){
			uint32_t last_index = (i + 1) * block_size - 1;
			uint32_t start_index = block_size - (last_index - text_size + 1);
			uint32_t size = block_size - start_index;
			memset(result[i] + start_index, 0, size);
		}
	}

	return result;
}

void encrypt_helper(const MCRYPT *td, char *plain_text, const uint32_t block_size){
	mcrypt_generic(*td, plain_text, block_size);
}

void decrypt_helper(const MCRYPT *td, char *encrypted_text, const uint32_t block_size){
	mdecrypt_generic(*td, encrypted_text, block_size);
}

char* crypt_templete(const CRYPT_INFO crypt_info, uint8_t mode){
	MCRYPT td;
	
	if((td = mcrypt_module_open("rijndael-128", NULL, "cbc", NULL)) == MCRYPT_FAILED){
		return NULL;
	}

	char *key = (char*)malloc(crypt_info.key_size);
	assert(key != NULL);
	memmove(key, crypt_info.key, crypt_info.key_size);
	
	char *iv = (char*)malloc(crypt_info.iv_size);
	assert(iv != NULL);
	memmove(iv, crypt_info.iv, crypt_info.iv_size);

	uint32_t block_size = mcrypt_enc_get_block_size(td);
	uint32_t multi_size;

	char* *text_blocks = multi_string_by_block_size(crypt_info.text, crypt_info.text_size, block_size, &multi_size, mode);

	mcrypt_generic_init(td, key, crypt_info.key_size, iv);
	
	char *result = (char*)malloc(sizeof(char) * multi_size * block_size);

	for(uint32_t i = 0; i < multi_size; i++){
		switch(mode){
		case ENCRYPT_MODE:
			mcrypt_generic(td, text_blocks[i], block_size);
			break;
		case DECRYPT_MODE:	
			mdecrypt_generic(td, text_blocks[i], block_size);
			break;
		default:
			return NULL;	
		}
		memmove(result + i * block_size, text_blocks[i], block_size);
		free(text_blocks[i]);
	}
	free(text_blocks);
	
	mcrypt_generic_deinit(td);
	mcrypt_generic_end(td);
	return result;
}
