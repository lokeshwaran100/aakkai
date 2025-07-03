import { supabase } from './supabase';

export const uploadPdfToStorage = async (file: File, projectId?: string): Promise<{ url: string; filename: string } | null> => {
  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = projectId 
      ? `projects/${projectId}/${timestamp}-${sanitizedName}`
      : `projects/temp/${timestamp}-${sanitizedName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('project-pdfs')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('project-pdfs')
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      filename: file.name
    };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return null;
  }
};

export const uploadProfileImageToStorage = async (file: File, userId: string): Promise<{ url: string; filename: string } | null> => {
  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `profiles/${userId}/${timestamp}.${fileExtension}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      filename: file.name
    };
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return null;
  }
};

export const deleteProfileImageFromStorage = async (url: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'profile-images');
    if (bucketIndex === -1) return false;
    
    const filePath = urlParts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from('profile-images')
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    return false;
  }
};

export const deletePdfFromStorage = async (url: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'project-pdfs');
    if (bucketIndex === -1) return false;
    
    const filePath = urlParts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from('project-pdfs')
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return false;
  }
};

export const getPdfUrl = (url: string): string => {
  // If it's already a full URL, return as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // If it's a storage path, get the public URL
  const { data } = supabase.storage
    .from('project-pdfs')
    .getPublicUrl(url);
    
  return data.publicUrl;
};