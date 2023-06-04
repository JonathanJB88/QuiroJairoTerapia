import type { NextApiRequest, NextApiResponse } from 'next';

import Comment, { IComment } from '@/models/Comment';
import { errorResponse, formatComment } from '@/helpers';

import {
  CreateCommentBody,
  DeleteCommentQuery,
  GetCommentsQuery,
  UpdateCommentBody,
  CreateCommentData,
  LikeCommentBody,
} from '@/interfaces';

// Create a comment
const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId, userId, content, rating, type } = req.body as CreateCommentBody;

  try {
    const commentData: CreateCommentData = { userId, content, type };

    if (type === 'comment') {
      const existingComment = await Comment.findOne({ postId, userId });
      if (existingComment) {
        return errorResponse(res, 400, 'Gracias, pero ya has dejado un comentario en este post.');
      }
      commentData.postId = postId;
    } else if (type === 'review') {
      const existingComment = await Comment.findOne({ userId, type });
      if (existingComment) {
        return errorResponse(res, 400, 'Gracias, pero ya has dejado tu reseña.');
      }
      commentData.rating = rating;
    }

    const comment: IComment = new Comment(commentData);
    await comment.save();
    await comment.populate('userId', '_id name');

    res.status(200).json({
      ok: true,
      msg: 'Comentario creado correctamente, espere a que sea aprobado por un administrador.',
      comment: formatComment(comment),
    });
  } catch (error) {
    console.log('Error al crear el comentario: ', error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Get comments by postId or type (testimonials)
const getCommentsByTypeOrPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId, type } = req.query as GetCommentsQuery;

  try {
    const comments: IComment[] = await Comment.find({
      ...(postId && { postId }),
      ...(type === 'review' && { type: 'review' }),
    })
      .sort({ createdAt: -1 })
      .populate('userId', '_id name')
      .lean();
    if (!comments.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(comments.map((comment) => formatComment(comment)));
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Update a comment
const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId, approved } = req.body as UpdateCommentBody;

  try {
    const comment: IComment | null = await Comment.findByIdAndUpdate(commentId, { approved }, { new: true });

    if (!comment) {
      return errorResponse(res, 404, 'No se encontró el comentario');
    }
    await comment.populate('userId', '_id name');

    res.status(200).json({
      ok: true,
      msg: 'Comentario aprobado correctamente',
      comment: formatComment(comment),
    });
  } catch (error) {
    console.log('Error al actualizar el comentario: ', error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Delete a comment
const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId } = req.query as DeleteCommentQuery;

  try {
    const comment: IComment | null = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return errorResponse(res, 404, 'No se encontró el comentario');
    }

    res.status(200).json({
      ok: true,
      msg: 'Comentario eliminado correctamente',
      comment: formatComment(comment),
    });
  } catch (error) {
    console.log('Error al eliminar el comentario: ', error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

const likeComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId, userId } = req.body as LikeCommentBody;

  try {
    const comment: IComment | null = await Comment.findById(commentId);

    if (!comment) return errorResponse(res, 404, 'No se encontró el comentario');

    if (comment.likes.includes(userId)) return errorResponse(res, 400, 'Ya has dado like a este comentario');

    comment.likes.push(userId);
    await comment.save();
    await comment.populate('userId', '_id name');

    res.status(200).json({
      ok: true,
      msg: 'Like agregado correctamente',
      comment: formatComment(comment),
    });
  } catch (error) {
    console.log('Error al dar like al comentario: ', error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

export { createComment, getCommentsByTypeOrPost, updateComment, deleteComment, likeComment };
