import { ApiRoutes } from "@/api";
import api from "@/lib/axios";

export type VerificationDto = {
  _id: string;
  verificationCode: string;
};

export type VerificationResponse = {
  access_token: string;
};

export function verificationAction(dto: VerificationDto) {
  try {
    return api.post<VerificationDto, VerificationResponse>(
      ApiRoutes.Verification,
      {
        ...dto,
        fingerprint: "1111",
      }
    );
  } catch (error) {
    throw new Error("Verification error: ", error);
  }
}
