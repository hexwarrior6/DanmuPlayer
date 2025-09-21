import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { type AxiosError, type AxiosResponse } from 'axios';

interface ChannelUrlResponse {
  url: string;
}

@Injectable()
export class TvService {
  async getChannelUrl(channelId: string): Promise<ChannelUrlResponse> {
    try {
      const response: AxiosResponse = await axios.head(
        `http://8.138.7.223/tv/shtv.php?id=${channelId}`,
        {
          maxRedirects: 0,
          validateStatus: (status: number): boolean =>
            status >= 200 && status < 400,
        },
      );

      const locationUrl = response.headers.location as string;

      if (!locationUrl) {
        throw new HttpException('频道URL未找到', HttpStatus.NOT_FOUND);
      }

      return { url: locationUrl };
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): ChannelUrlResponse {
    // 类型保护：检查是否为 Axios 错误
    if (axios.isAxiosError(error)) {
      return this.handleAxiosError(error);
    }

    // 非 Axios 错误
    if (error instanceof Error) {
      throw new HttpException(
        `获取频道URL失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 未知错误
    throw new HttpException(
      '获取频道URL失败: 未知错误',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private handleAxiosError(axiosError: AxiosError): ChannelUrlResponse {
    const location = axiosError.response?.headers?.location;

    if (location && typeof location === 'string') {
      return { url: location };
    }

    if (location && typeof location !== 'string') {
      throw new HttpException(
        '重定向URL格式无效',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException(
      `获取频道URL失败: ${axiosError.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
