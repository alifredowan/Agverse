<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        $contacts = ContactSubmission::latest()->get();

        return response()->json([
            'success' => true,
            'count' => $contacts->count(),
            'data' => $contacts,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        if ($request->filled('bot_check')) {
            return response()->json([
                'success' => true,
                'message' => "Thanks, we'll reply within 2 business days.",
            ]);
        }

        $validator = Validator::make($request->all(), [
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string'],
        ], [
            'fullName.required' => 'Full name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'message.required' => 'Please include a message or inquiry details.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed. Please correct the highlighted errors.',
                'errors' => $validator->errors(),
            ], 400);
        }

        $submissionId = 'AGV-CNT-' . strtoupper(base_convert((string) now()->getTimestampMs(), 10, 36));

        ContactSubmission::create([
            'submission_id' => $submissionId,
            'full_name' => trim((string) $request->input('fullName')),
            'email' => trim((string) $request->input('email')),
            'phone' => trim((string) $request->input('phone', '')),
            'company' => trim((string) $request->input('company', '')),
            'interest' => $request->input('interest') ?: 'Tech Audit',
            'message' => trim((string) $request->input('message')),
            'ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'message' => "Thanks, we'll reply within 2 business days.",
            'submissionId' => $submissionId,
        ]);
    }
}
