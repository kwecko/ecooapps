import React from 'react';
import Image from "next/image";
import { Control, UseFormRegister, UseFormGetValues, FieldErrors, Controller } from "react-hook-form"; 
import { HiOutlineMinusCircle, HiOutlinePencil, HiOutlinePlusCircle } from "react-icons/hi";

import CustomInput from "@shared/components/CustomInput";
import ProfilePhotoEditor from './ProfilePhotoEditor';
import { ChangeComercialRegistrationSchema } from '@shared/schemas/change-comercial-registration';

type ImageItem = string | File;

interface CommercialInfoFormProps {
  photo: string;
  images: ImageItem[];
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  sendImage: (image: File) => void;
  removeImage: (image: ImageItem) => void;
  register: UseFormRegister<ChangeComercialRegistrationSchema>;
  errors: FieldErrors<ChangeComercialRegistrationSchema>;
  charCount: number;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
  getValues: UseFormGetValues<ChangeComercialRegistrationSchema>;
  control: Control<ChangeComercialRegistrationSchema>;
}

const CommercialInfoForm: React.FC<CommercialInfoFormProps> = ({ 
  photo, 
  images, 
  setPhoto, 
  sendImage, 
  removeImage, 
  register, 
  errors, 
  charCount, 
  setCharCount, 
  getValues, 
  control 
}) => {
  const handleImageClick = (image: ImageItem) => {
    if (typeof image === 'string') {
      removeImage(image);
    } else {
      removeImage(image);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sendImage(file);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  const renderImageItem = (image: ImageItem, index: number) => (
    <div
      key={index}
      className="w-20 h-20 cursor-pointer relative bg-white border border-theme-default rounded-lg flex items-center justify-center overflow-hidden"
      onClick={() => handleImageClick(image)}
    >
      <Image
        id={`photo-${index}`}
        priority
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt="User"
        width={80}
        height={80}
        className="rounded-lg object-cover w-full h-full"
      />
      <HiOutlineMinusCircle className="h-8 w-8 text-white absolute inset-0 m-auto" />
    </div>
  );

  const renderImageUpload = (index: number) => (
    <label
      key={index}
      htmlFor={`image-input-${index}`}
      className="w-20 h-20 cursor-pointer relative bg-white border border-theme-default rounded-lg flex items-center justify-center overflow-hidden"
    >
      <input
        id={`image-input-${index}`}
        type="file"
        accept="image/png, image/jpeg"
        className="w-full h-full opacity-0 cursor-pointer absolute"
        onChange={handleImageUpload}
      />
      <HiOutlinePlusCircle className="h-8 w-8 text-theme-primary" />
    </label>
  );

  const renderImageGrid = () => {
    return Array.from({ length: 4 }).map((_, index) => {
      return images[index] 
        ? renderImageItem(images[index], index)
        : renderImageUpload(index);
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <ProfilePhotoEditor
        photo={photo}
        setPhoto={setPhoto}
        control={control}
        errors={errors}
      />
      
      <CustomInput
        register={{ ...register("name") }}
        placeholder="Nome comercial"
        label="Nome comercial"
        type="text"
        errorMessage={errors.name?.message}
      />
      
      <CustomInput
        register={{ ...register("tally") }}
        placeholder="Inscrição estadual"
        label="Inscrição estadual"
        inputMode="numeric"
        type="text"
        mask="tally"
        errorMessage={errors.tally?.message}
        disabled
      />
      
      <div className="w-full h-full relative flex flex-col text-slate-gray">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Descrição
        </label>
        <textarea
          {...register("description")}
          maxLength={500}
          placeholder="Escreva uma breve descrição"
          className="w-full p-3 border border-theme-primary rounded-lg font-inter font-normal box-border h-50 resize-none"
          onChange={handleDescriptionChange}
        />
        <p className="text-right text-slate-gray text-xs mt-1">
          {charCount || getValues("description")?.length || 0}/500
        </p>
      </div>
      
      <div className="relative flex flex-col text-slate-gray w-full">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Mostre o seu trabalho em até 4 fotos
        </label>
        <div className="w-full flex flex-row justify-center items-center flex-wrap gap-4">
          {renderImageGrid()}
        </div>
      </div>
    </div>
  );
};

export default CommercialInfoForm;