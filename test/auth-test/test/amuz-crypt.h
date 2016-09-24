#include "mcrypt.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <assert.h>

#define ENCRYPT_MODE 0x65
#define DECRYPT_MODE 0x64

typedef struct _crypt_info{
	const char *text;
	const uint32_t text_size;
	const char *key;
	const uint32_t key_size;
	const char *iv;
	const uint32_t iv_size;
}CRYPT_INFO;

char* substring(const char*, const uint32_t, const uint32_t);
char** multi_string_by_block_size(const char*, const uint32_t, const uint32_t, uint32_t*, uint8_t);
char* crypt_templete(const CRYPT_INFO, uint8_t);
