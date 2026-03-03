import { useState, useEffect } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import {
  Earth, Map, Building2, MapPin,
  ChevronDown, ChevronRight,
  RotateCcw, ArrowDown, Loader2,
} from 'lucide-react'

export async function loader() {
  const res = await fetch('/data/indonesia_regions.json')
  return res.json()
}

export default function App() {
  const { provinces, regencies, districts } = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const provinceId = searchParams.get('province') || ''
  const regencyId  = searchParams.get('regency')  || ''
  const districtId = searchParams.get('district') || ''

  const hasSelection = !!(provinceId || regencyId || districtId)

  const filteredRegencies = regencies.filter(r =>
    provinceId ? r.province_id === Number(provinceId) : false
  )
  const filteredDistricts = districts.filter(d =>
    regencyId ? d.regency_id === Number(regencyId) : false
  )

  const selectedProvince = provinces.find(p => p.id === Number(provinceId))
  const selectedRegency  = regencies.find(r => r.id === Number(regencyId))
  const selectedDistrict = districts.find(d => d.id === Number(districtId))

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [provinceId, regencyId, districtId])

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key === 'province') {
      params.delete('regency')
      params.delete('district')
    }
    if (key === 'regency') {
      params.delete('district')
    }
    setSearchParams(params)
  }

  const handleReset = () => setSearchParams({})

  const SelectField = ({ label, name, icon: Icon, value, onChange, disabled, children }) => (
    <div>
      <label className="block text-xs font-medium uppercase text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-xl
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            p-2.5 pl-10 pr-10 transition-all hover:border-blue-400
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {children}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  )

  const ResultItem = ({ label, value }) => (
    <div className="text-center">
      <p className="text-[10px] text-blue-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-bold text-gray-900">
        {value || <span className="text-gray-200">—</span>}
      </p>
    </div>
  )

  const BreadcrumbItem = ({ label, isActive }) => (
    <>
      <ChevronRight size={12} className="text-gray-300" />
      <span className={isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}>{label}</span>
    </>
  )

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <aside className="w-72 p-6 bg-white border-r flex flex-col">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-10">
          <div className="bg-blue-100 p-1 rounded-xl">
            <Earth className="text-blue-600" size={18} />
          </div>
          Frontend Assessment
        </h2>

        <p className="text-gray-400 text-[10px] uppercase mb-6">Filter Wilayah</p>

        <div className="space-y-6">
          <SelectField
            label="Provinsi"
            name="province"
            icon={Map}
            value={provinceId}
            onChange={e => updateParam('province', e.target.value)}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Kota / Kabupaten"
            name="regency"
            icon={Building2}
            value={regencyId}
            onChange={e => updateParam('regency', e.target.value)}
            disabled={!provinceId}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {filteredRegencies.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Kecamatan"
            name="district"
            icon={MapPin}
            value={districtId}
            onChange={e => updateParam('district', e.target.value)}
            disabled={!regencyId}
          >
            <option value="">Pilih Kecamatan</option>
            {filteredDistricts.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </SelectField>
        </div>

        <div className="pt-10">
          <button
            onClick={handleReset}
            disabled={!hasSelection}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase
              bg-transparent border-2 border-blue-500 text-blue-600 rounded-xl py-3
              transition-all hover:bg-blue-50 active:scale-[0.98]
              disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-10 py-5">
          <nav className="text-sm flex items-center gap-2">
            <span className={!selectedProvince ? 'text-blue-600' : 'text-gray-500'}>
              Indonesia
            </span>
            {selectedProvince && (
              <BreadcrumbItem label={selectedProvince.name} isActive={!selectedRegency} />
            )}
            {selectedRegency && (
              <BreadcrumbItem label={selectedRegency.name} isActive={!selectedDistrict} />
            )}
            {selectedDistrict && (
              <BreadcrumbItem label={selectedDistrict.name} isActive />
            )}
          </nav>
        </header>
        <main className="flex-1 flex items-center justify-center px-10">
          {loading ? (
            <Loader2 size={28} className="animate-spin text-blue-400" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ResultItem label="Provinsi"        value={selectedProvince?.name} />
              <ArrowDown size={18} className="text-blue-200 my-4" />
              <ResultItem label="Kota / Kabupaten" value={selectedRegency?.name} />
              <ArrowDown size={18} className="text-blue-200 my-4" />
              <ResultItem label="Kecamatan"        value={selectedDistrict?.name} />
            </div>
          )}
        </main>

      </div>
    </div>
  )
}
