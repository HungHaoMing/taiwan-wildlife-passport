export function resolveInitialParticipantView({ search = '', hasNickname, hasPendingStamp, hasInvalidStampRequest }) {
  // Public URLs never unlock operational tools. Unknown parameters such as
  // ?staff=1 and ?view=qr are intentionally ignored.
  void search;
  if (hasNickname && hasPendingStamp) return 'claim-pending';
  if (hasNickname && hasInvalidStampRequest) return 'invalid';
  if (hasNickname) return 'card';
  return 'start';
}
