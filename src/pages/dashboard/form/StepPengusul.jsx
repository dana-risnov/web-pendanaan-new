export default function StepPengusul({ data, onChange }) {
  const members = data.members || [
    { id: 1, nama: '', nidn: '', institusi: '', keahlian: '', peran: 'Ketua Peneliti' },
  ]

  function updateMembers(newMembers) { onChange('members', newMembers) }
  function updateMember(id, key, val) {
    updateMembers(members.map(m => m.id === id ? { ...m, [key]: val } : m))
  }
  function addMember() {
    updateMembers([...members, { id: Date.now(), nama: '', nidn: '', institusi: '', keahlian: '', peran: 'Anggota' }])
  }
  function removeMember(id) {
    if (members.length > 1) updateMembers(members.filter(m => m.id !== id))
  }

  const inp = {
    width: '100%', border: '0.5px solid #cbd5e1', borderRadius: 7,
    padding: '9px 12px', fontSize: 13, color: '#1e293b', outline: 'none',
    fontFamily: 'inherit', background: '#fff', transition: 'border-color .15s',
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Tim Pengusul</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>Data ketua dan anggota tim peneliti yang terlibat dalam proposal</p>
      </div>

      {members.map((member, idx) => (
        <div key={member.id} style={{
          border: `0.5px solid ${member.peran === 'Ketua Peneliti' ? '#E24B4A' : '#e2e8f0'}`,
          borderRadius: 10, padding: 20, marginBottom: 14, position: 'relative',
          background: member.peran === 'Ketua Peneliti' ? 'rgba(226,75,74,0.02)' : '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: member.peran === 'Ketua Peneliti' ? '#E24B4A' : '#f1f5f9',
                color: member.peran === 'Ketua Peneliti' ? '#fff' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}>
                {idx + 1}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>
                  {member.nama || `Anggota Tim ${idx + 1}`}
                </div>
                <div style={{ fontSize: 11, color: member.peran === 'Ketua Peneliti' ? '#E24B4A' : '#64748b' }}>
                  {member.peran}
                </div>
              </div>
            </div>
            {idx > 0 && (
              <button onClick={() => removeMember(member.id)} style={{ border: 'none', background: 'transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 18 }}
                onMouseEnter={e => e.currentTarget.style.color = '#E24B4A'}
                onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
              >✕</button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              ['nama',      'Nama Lengkap'],
              ['nidn',      'NIDN / NIP'],
              ['institusi', 'Institusi/Afiliasi'],
              ['keahlian',  'Bidang Keahlian'],
            ].map(([key, label]) => (
              <div key={key}>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>{label}<span style={{ color: '#E24B4A' }}>*</span></label>
                <input style={inp} value={member[key]} onChange={e => updateMember(member.id, key, e.target.value)} placeholder={`Isi ${label.toLowerCase()}…`} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>Peran dalam Tim<span style={{ color: '#E24B4A' }}>*</span></label>
              <select style={inp} value={member.peran} onChange={e => updateMember(member.id, 'peran', e.target.value)} disabled={idx === 0}>
                <option value="Ketua Peneliti">Ketua Peneliti</option>
                <option value="Anggota">Anggota</option>
                <option value="Co-Investigator">Co-Investigator</option>
                <option value="Tenaga Ahli">Tenaga Ahli</option>
                <option value="Mahasiswa">Mahasiswa</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>Email Institusi</label>
              <input style={inp} type="email" value={member.email || ''} onChange={e => updateMember(member.id, 'email', e.target.value)} placeholder="email@institusi.ac.id" />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addMember} style={{
        width: '100%', fontSize: 13, padding: '10px', borderRadius: 8,
        border: '0.5px dashed #cbd5e1', background: '#fff', color: '#64748b',
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#E24B4A'; e.currentTarget.style.color = '#E24B4A' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b' }}
      >
        + Tambah Anggota Tim
      </button>

      <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 8, padding: '14px 16px', fontSize: 12.5, color: '#475569', lineHeight: 1.7 }}>
        <strong style={{ color: '#1e293b' }}>Catatan:</strong> Ketua Peneliti harus memiliki NIDN/NIP aktif dan tidak sedang menjadi ketua pada proposal aktif lainnya. Maksimal 5 anggota tim per proposal.
      </div>
    </div>
  )
}
