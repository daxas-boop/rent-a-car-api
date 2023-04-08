import { Module } from '@nestjs/common';
import { s3UploaderService } from './imageUploader.service';
import { IMAGE_UPLOADER_SERVICE } from './interface/imageUploader.service.interface';

@Module({
  providers: [
    {
      provide: IMAGE_UPLOADER_SERVICE,
      useClass: s3UploaderService,
    },
  ],
  exports: [
    {
      provide: IMAGE_UPLOADER_SERVICE,
      useClass: s3UploaderService,
    },
  ],
})
export class ImageUploaderModule {}
