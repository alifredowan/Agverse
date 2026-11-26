<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuditRequestController extends Controller
{
    public function index(): JsonResponse
    {
        $audits = AuditRequest::latest()->get();

        return response()->json([
            'success' => true,
            'count' => $audits->count(),
            'data' => $audits,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:100'],
            'farmName' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            $message = $validator->errors()->has('email')
                ? 'Please provide a valid email address.'
                : 'Please provide all required fields: fullName, email, phone, and farmName.';

            return response()->json([
                'success' => false,
                'message' => $message,
            ], 400);
        }

        $referenceId = 'AGV-' . random_int(100000, 999999);

        $audit = AuditRequest::create([
            'reference_id' => $referenceId,
            'full_name' => trim((string) $request->input('fullName')),
            'email' => trim((string) $request->input('email')),
            'phone' => trim((string) $request->input('phone')),
            'farm_name' => trim((string) $request->input('farmName')),
            'location' => trim((string) ($request->input('location') ?: 'Dubai, UAE')),
            'farm_size' => $request->input('farmSize') ?: 'Not specified',
            'interest' => $request->input('interest') ?: 'Autonomous Robotics',
            'notes' => trim((string) $request->input('notes', '')),
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Farm technology audit request submitted successfully.',
            'referenceId' => $referenceId,
            'data' => $audit,
        ], 201);
    }

    public function show(string $ref): JsonResponse
    {
        $audit = AuditRequest::whereRaw('LOWER(reference_id) = ?', [strtolower($ref)])
            ->first();

        if (! $audit) {
            return response()->json([
                'success' => false,
                'message' => 'Audit request not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $audit,
        ]);
    }
}
