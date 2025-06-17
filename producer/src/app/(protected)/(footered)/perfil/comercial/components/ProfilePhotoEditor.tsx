"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { type Control, Controller } from "react-hook-form"
import { HiOutlinePencil, HiX } from "react-icons/hi"
import Cropper, { type Point, type Area } from "react-easy-crop"

interface ProfilePhotoEditorProps {
  photo: string
  setPhoto: React.Dispatch<React.SetStateAction<string>>
  control: Control<any>
  errors: any
}

function ProfilePhotoEditor({ photo, setPhoto, control, errors }: ProfilePhotoEditorProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [fileToSubmit, setFileToSubmit] = useState<File | null>(null); // Novo estado para o arquivo cropado

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const image = document.createElement("img")
      image.src = url
      image.crossOrigin = "anonymous"
      image.onload = () => resolve(image)
      image.onerror = () => {
        image.src = "/producer.jpeg"
        resolve(image)
      }
    })
  }

  const getCroppedImgBlob = async (): Promise<Blob | null> => {
    if (!originalImage || !croppedArea) return null

    try {
      const image = await createImage(originalImage)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = 256
      canvas.height = 256

      if (ctx) {
        ctx.drawImage(image, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, 256, 256)
      }

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          "image/jpeg",
          0.9,
        )
      })
    } catch (error) {
      console.error("Erro ao processar imagem:", error)
      return null
    }
  }

  const handleSave = async (onChangeForm: (file: File) => void) => {
    try {
      const croppedBlob = await getCroppedImgBlob()
      if (croppedBlob) {
        const croppedFile = new File([croppedBlob], "profile_photo.jpeg", { type: "image/jpeg" });
        setPhoto(URL.createObjectURL(croppedFile)); 
        setFileToSubmit(croppedFile); 
        onChangeForm(croppedFile); 
      }
      setShowEditor(false);
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
    }
  };

  const handleCancel = () => {
    setShowEditor(false)
    setOriginalImage(null)
    setCrop({ x: 0, y: 0 })
    setFileToSubmit(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setOriginalImage(url)
      setShowEditor(true)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-38 h-38 relative">
        <div className="w-38 h-38 rounded-full overflow-hidden border-2 border-theme-primary">
          <Image
            src={photo || "/producer.jpeg"}
            alt="Foto do perfil"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/producer.jpeg"
            }}
          />
        </div>
        <div className="absolute w-10 h-10 bottom-2 right-2 bg-theme-primary bg-opacity-80 rounded-full cursor-pointer">
          <label className="cursor-pointer w-full h-full relative flex items-center justify-center">
            <HiOutlinePencil className="text-white h-6 w-6" />
            <Controller
              name="photo"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)} 
                />
              )}
            />
          </label>
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full max-h-[60vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b">
              <h3 className="text-lg font-semibold">Ajustar Imagem</h3>
              <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded-full">
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <div className="relative w-full h-60 bg-gray-100">
              {originalImage && (
                <Cropper
                  image={originalImage}
                  crop={crop}
                  zoom={1}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                  zoomWithScroll={false}
                />
              )}
            </div>

            <div className="flex justify-end space-x-3 p-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <Controller
                name="photo"
                control={control}
                render={({ field: { onChange } }) => (
                  <button
                    type="button"
                    onClick={() => handleSave(onChange)}
                    className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Salvar
                  </button>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {errors.photo && (
        <span className="text-red-500 text-sm font-semibold mt-2">
          {typeof errors.photo?.message === "string" && errors.photo.message}
        </span>
      )}
    </div>
  )
}

export default ProfilePhotoEditor;