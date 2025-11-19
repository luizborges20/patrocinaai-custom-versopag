'use client';

import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  description?: string;
}

export function ImageUpload({ value, onChange, label, description }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida');
        return;
      }

      // Validar tamanho (máx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB');
        return;
      }

      // Converter para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-900">{label}</label>

      {value ? (
        // Preview da imagem
        <div className="relative">
          <div className="relative w-full h-40 bg-gray-100 rounded-xl border-2 border-gray-200 overflow-hidden">
            <img
              src={value}
              alt={label}
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            onClick={handleRemove}
            variant="outline"
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white border-gray-300 p-2 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Upload area
        <div>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 flex-col gap-2"
          >
            <Upload className="h-8 w-8 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">Clique para fazer upload</span>
            <span className="text-xs text-gray-400">PNG, JPG ou WEBP (máx. 2MB)</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}
