export const IMAGE_UPLOADER_SERVICE = 'IMAGE_UPLOADER_SERVICE';

export interface IimageUploaderService {
  upload(image: Buffer, filename: string): Promise<string>;
}
