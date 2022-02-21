export function validateRequest(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
