export default function StepDetail({ data, onChange }) {
  const field = (key, label, type = 'text', required = true, options = []) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: '#475569' }}>
        {label}{required && <span style={{ color: '#E24B4A', marginLeft: 2 }}>*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={data[key] || ''}
          onChange={e => onChange(key, e.target.value)}
          style={inp}
        >
          <option value="">Pilih…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={data[key] || ''}
          onChange={e => onChange(key, e.target.value)}
          rows={3}
          style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }}
          placeholder={`Isi ${label.toLowerCase()}…`}
        />
      ) : (
        <input
          type={type}
          value={data[key] || ''}
          onChange={e => onChange(key, e.target.value)}
          style={inp}
          placeholder={`Isi ${label.toLowerCase()}…`}
        />
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ marginBottom: 4 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Detail Proposal</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>Informasi dasar mengenai proposal yang akan diajukan</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {field('judul', 'Judul Proposal')}
        {field('skema', 'Skema Pendanaan', 'select', true, [
          'RIIM Kompetisi','RIIM Ekspedisi','Pusat Kolaborasi Riset','RIIM Invitasi','RIIM Kolaborasi','RIIM Start-Up','CFP Rumah Program',
        ])}
        {field('topik', 'Topik Riset', 'select', true, [
          'Air & Lingkungan Hidup','Tenaga Nuklir','Dirgantara & Antariksa','Sosial Masyarakat','Pangan','Energi','Kesehatan','Industri Strategis',
        ])}
        {field('durasi', 'Durasi (Periode)', 'select', true, ['1 Periode (12 Bulan)','2 Periode (24 Bulan)','3 Periode (36 Bulan)'])}
        {field('tanggal_mulai', 'Tanggal Mulai', 'date')}
        {field('tanggal_selesai', 'Tanggal Selesai', 'date')}
      </div>

      {field('abstrak', 'Abstrak', 'textarea')}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {field('institusi', 'Nama Institusi')}
        {field('npwp', 'NPWP Institusi')}
        {field('provinsi', 'Provinsi', 'select', true, [
          'DKI Jakarta','Jawa Barat','Jawa Tengah','Jawa Timur','DI Yogyakarta','Banten',
          'Sumatera Utara','Aceh','Papua','Kalimantan Timur','Sulawesi Selatan',
        ])}
        {field('kota', 'Kab/Kota')}
      </div>
    </div>
  )
}

const inp = {
  background: '#fff', border: '0.5px solid #cbd5e1', borderRadius: 7,
  padding: '9px 12px', fontSize: 13.5, color: '#1e293b', outline: 'none',
  fontFamily: 'inherit', width: '100%', transition: 'border-color .15s',
}
