export default function MatchDisplay({ transcript, mentor }) {
  return (
    <div>
      <p><strong>Transcript:</strong> {transcript}</p>
      {mentor && (
        <>
          <h3>✅ Matched Mentor: {mentor.mentor_name}</h3>
          <p>{mentor.bio}</p>
        </>
      )}
    </div>
  );
}
